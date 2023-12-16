import {
    YearModelItem, BrandYearItem, BrandItem, ItemRec, allBrands, sortedBrands
} from '@/dao/car';
import { baseLogger } from '@/dao/logger';



/**
 * type : brand
 * Query all brands
 */
export function queryAllBrands() : Array<ItemRec> {
    const result : Array<ItemRec> = [];
    for(const brandEle of sortedBrands){
        result.push(
            {
                key: brandEle.key,
                value: brandEle.value
            }
        );
    }
    return result;
}

/**
 * type : year
 * Query all brands
 */
export function queryAllYearsByBrand(brandId: number) : Array<ItemRec> {
    const result : Array<ItemRec> = [];
    outer:for(const brandEle of allBrands){
        // baseLogger.debug(brandEle.key);
        if(brandEle.key === brandId){
            for(const yearEle of brandEle.addon as BrandYearItem[]){
                result.push(
                    {
                        key: yearEle.key,
                        value: yearEle.value
                    }
                );
            }
            break outer;
        }
    }
    return result;
}

/**
 * type : model
 * Query all brands
 */
export function queryAllModelsByYear(brandId: number, year: number) : Array<ItemRec> {
    const result : Array<ItemRec> = [];
    outer:for(const brandEle of allBrands){
        // baseLogger.debug(brandEle.key);
        if(brandEle.key === brandId){
            for(const yearEle of brandEle.addon as BrandYearItem[]){
                // baseLogger.debug(yearEle.key);
                if(yearEle.key === year){
                    for(const modelEle of yearEle.addon as YearModelItem[]){
                        result.push(
                            {
                                key: modelEle.key,
                                value: modelEle.value
                            }
                        );
                    }
                    break outer;
                }
            }
        }
    }
    return result;
}

/**
 * type : body
 * Query all brands
 */
export function queryAllBodiesByModel(brandId: number, year: number, modelId: number) : Array<string> {
    const result : Array<string> = [];
    outer:for(const brandEle of allBrands){
        // baseLogger.debug(brandEle.key);
        if(brandEle.key === brandId){
            for(const yearEle of brandEle.addon as BrandYearItem[]){
                // baseLogger.debug(yearEle.key);
                if(yearEle.key === year){
                    for(const modelEle of yearEle.addon as YearModelItem[]){
                        if(modelEle.key === modelId){
                            for(const body of modelEle.addon as Array<string>){
                                result.push(body);
                            }
                            break outer;
                        }
                    }
                }
            }
        }
    }
    return result;
}


