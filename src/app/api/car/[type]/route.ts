import { NextResponse, NextRequest } from 'next/server';
import {
    YearModelItem, BrandYearItem, BrandItem, ItemRec, allBrands
} from '@/dao/car';
import {
    queryAllBrands, queryAllYearsByBrand, queryAllModelsByYear, queryAllBodiesByModel
} from '@/dao/car_inquiry';


// type SearchParams = {
//     brandId? : number;
//     year? : number;
//     modelId? : number;
// };

// visit :  http://localhost:3000/api/brand
export async function GET(
    request: NextRequest,
    { params }: { params: { type: string } }
  ) {
    const type = params.type;
    try{
        let result : any = {};
        switch(type){
            case "brand": {
                result = queryAllBrands();
                break;
            }
            case "year": {
                const brandId = request.nextUrl.searchParams.get("brand") as string;
                result = queryAllYearsByBrand(Number(brandId));
                break;
            }
            case "model": {
                const brandId = request.nextUrl.searchParams.get("brand") as string;
                const year = request.nextUrl.searchParams.get("year") as string;
                result = queryAllModelsByYear(Number(brandId), Number(year));
                break;
            }
            case "body": {
                const brandId = request.nextUrl.searchParams.get("brand") as string;
                const year = request.nextUrl.searchParams.get("year") as string;
                const modelId = request.nextUrl.searchParams.get("model") as string;
                result = queryAllBodiesByModel(Number(brandId), Number(year), Number(modelId));
                break;
            }
            default:{
                result = queryAllBrands();
            }
        }
        const response = Response.json({
            error : "ok",
            result : result
        });
        return response;
    }catch(err: any){
        return Response.json({error: err.cause.code}, {status: 500});
    }
}

