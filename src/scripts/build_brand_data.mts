/***
 * Query data from pmctire.com
 * Written by Hyman @ Dec.14th 2023
 * NOTE : 
 * To execute this script file, MUST DO LIKE THIS : 
 * node --loader ts-node/esm .\src\scripts\build_brand_data.mts
 * If you use *.ts, it does not work.
 * If you use ts-node-esm, it does not work.
 */

import fetch from 'node-fetch';
import http from 'node:http';
import https from 'node:https';
import fs from 'fs';


const maxYearsLimit : number = 10;
const maxEarylyYear = (new Date()).getFullYear() - maxYearsLimit;
const outputPath: string = "./data/";
const finalOutputPath: string = "./data/final/";

const httpAgent = new http.Agent({
	keepAlive: true
});
const httpsAgent = new https.Agent({
	keepAlive: true
});


const getBrandListUri = () => { return 'https://pmctire.com/api/fitment' }

const getYearsOfBrandUri = (makeId:number) => `https://pmctire.com/api/fitment/years?makeId=${makeId}`;

const getModelsOfBrandYearUri = (makeId:number, year:number) => `https://pmctire.com/api/fitment/models?makeId=${makeId}&yearId=${year}`;

const getBodiesOfBrandYearModelUri = (makeId:number, year:number, modelId:number) => `https://pmctire.com/api/fitment/bodies?makeId=${makeId}&yearId=${year}&modelId=${modelId}`;

const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))

export interface KV {
    key: number;
    value: string;
    addon?: any;
}

type CommonResp = {
    success : boolean;
    statusCode : number;
    result : Array<KV|string>;
};

export const fetchData = async <T,>(url:string): Promise<T> => {
    const response = await fetch(url, { method: 'GET', agent: httpsAgent });
    const body = await response.text();
    const last : T = JSON.parse(body);
    return new Promise((resolve) => {
        resolve(last);
    });
}

export const getBrandList = async () : Promise<Array<KV|string>> => {
    const resp : CommonResp = await fetchData(getBrandListUri());
    // console.log(json);
    return resp.result;
}

export const getYearsOfBrand = async (makeId:number) : Promise<Array<KV|string>> => {
    await delay(1000);
    console.log(`begin to getYearsOfBrand(${makeId})`);
    const resp : CommonResp = await fetchData(getYearsOfBrandUri(makeId));
    console.log(`end to getYearsOfBrand(${makeId})`);
    // console.log(json);
    return resp.result;
}

export const getModelsOfBrandYear = async (makeId:number, year:number) : Promise<Array<KV|string>> => {
    await delay(1000);
    console.log(`begin to getModelsOfBrandYear(${makeId},${year})`);
    const resp : CommonResp = await fetchData(getModelsOfBrandYearUri(makeId, year));
    console.log(`end to getModelsOfBrandYear(${makeId},${year})`);
    // console.log(json);
    return resp.result;
}

export const getBodiesOfBrandYearModel = async (makeId:number, year:number, modelId:number) : Promise<Array<KV|string>> => {
    await delay(1000);
    console.log(`begin to getBodiesOfBrandYearModel(${makeId},${year},${modelId})`);
    const resp : CommonResp = await fetchData(getBodiesOfBrandYearModelUri(makeId, year, modelId));
    console.log(`end to getBodiesOfBrandYearModel(${makeId},${year},${modelId})`);
    // console.log(json);
    return resp.result;
}


// getBrandList()
//     .then((res) => JSON.stringify(res))
//     .then((data) => console.log(data))
//     .catch((err) => {console.log("error occured", err) });

const main = async () => {
    // begin to assemble data
    let brandData = await getBrandList();
    let totalCount = brandData.length;
    let currentCounter = 0;
    // console.log(brandData.result);
    // NOTE: cannot use forEach() in the following codes 
    // refer to : https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
    // modify every brand record
    for(const brandEle of brandData){  
        let brand = brandEle as KV;
        console.log(">>>>>> "+brand.value);
        // check if exist for this brand
        if (fs.existsSync(outputPath + "brand_"+brand.key+".json")){
            console.log(">>>>>> have handled already.");
            currentCounter++;
            console.log(`**************** Have finished tasks program : ${currentCounter} / ${totalCount} ****************`);
            continue;
        }
        let yearData = await getYearsOfBrand(brand.key);
        let newYearData: KV[] = [];
        let yearCouter : number = 0;
        // modify every year record
        for(const yearEle of yearData){
            let year = yearEle as KV;
            if ( yearCouter++ > maxYearsLimit ){
                break;
            }
            let modelData = await getModelsOfBrandYear(brand.key, year.key);
            // modify every model record
            for(const modelEle of modelData){
                let model = modelEle as KV;
                let bodiesData = await getBodiesOfBrandYearModel(brand.key, year.key, model.key);
                model.addon = bodiesData as KV[];
            }
            year.addon = modelData as KV[];
            newYearData.push(year);
        }
        brand.addon = newYearData;
        // write the data of this brand
        fs.writeFileSync(outputPath + "brand_"+brand.key+".json", JSON.stringify(brand, null, 2));
        currentCounter++;
        console.log(`**************** Have finished tasks program : ${currentCounter} / ${totalCount} ****************`);
    }
    // write brand data into the final file
    const ts = Date.now();
    const path = finalOutputPath + `brands_${ts}.json`;
    const paths : string[] = fs.readdirSync(outputPath);
    const finalData : KV[] = [];
    for(const p of paths){
        if (fs.lstatSync(outputPath+p).isDirectory() ){
            continue;  // skip directory
        }
        console.log(outputPath+p);
        const buf: Buffer = fs.readFileSync(outputPath+p);
        const last : KV = JSON.parse(buf.toString());
        finalData.push(last);
    }
    await fs.writeFile(path, JSON.stringify(finalData, null, 2), (error) => {
        if (error) {
            console.log('An error has occurred ', error);
            return;
        }
        console.log('Data written successfully to disk');
    });
};



main();

