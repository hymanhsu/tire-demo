export type TypeSize = {
    key: number;
    flag: boolean;  // most common
}

export const allWidths: TypeSize[] = [
    {key:50,flag:false},
    {key:60,flag:false},
    {key:70,flag:false},
    {key:80,flag:false},
    {key:90,flag:false},
    {key:100,flag:false},
    {key:110,flag:false},
    {key:115,flag:false},
    {key:120,flag:false},
    {key:125,flag:false},
    {key:130,flag:false},
    {key:135,flag:false},
    {key:140,flag:false},
    {key:145,flag:false},
    {key:150,flag:false},
    {key:155,flag:false},
    {key:160,flag:false},
    {key:165,flag:false},
    {key:170,flag:false},
    {key:175,flag:false},
    {key:180,flag:false},
    {key:185,flag:false},
    {key:190,flag:false},
    {key:195,flag:false},
    {key:200,flag:false},
    {key:205,flag:false},
    {key:215,flag:false},
    {key:220,flag:false},
    {key:225,flag:true},
    {key:230,flag:false},
    {key:235,flag:false},
    {key:240,flag:false},
    {key:245,flag:false},
    {key:255,flag:false},
    {key:265,flag:false},
    {key:275,flag:false},
    {key:285,flag:false},
    {key:295,flag:false},
    {key:305,flag:false},
    {key:315,flag:false},
    {key:325,flag:false},
    {key:335,flag:false},
    {key:345,flag:false},
    {key:355,flag:false},
]

export const allRatios: TypeSize[] = [
    {key:25,flag:false},
    {key:30,flag:false},
    {key:35,flag:false},
    {key:40,flag:false},
    {key:45,flag:true},
    {key:50,flag:false},
    {key:55,flag:false},
    {key:60,flag:false},
    {key:65,flag:false},
    {key:70,flag:false},
    {key:75,flag:false},
    {key:80,flag:false},
    {key:85,flag:false},
    {key:90,flag:false},
    {key:95,flag:false},
    {key:100,flag:false},
]

export const allDiameters: TypeSize[] = [
    {key:10,flag:false},
    {key:11,flag:false},
    {key:12,flag:false},
    {key:13,flag:false},
    {key:14,flag:false},
    {key:15,flag:false},
    {key:16,flag:false},
    {key:17,flag:true},
    {key:18,flag:false},
    {key:19,flag:false},
    {key:20,flag:false},
    {key:21,flag:false},
    {key:22,flag:false},
    {key:23,flag:false},
    {key:24,flag:false},
    {key:26,flag:false},
    {key:28,flag:false},
]

export function getMostCommonlyWidth(): number {
    for(const item of allWidths as TypeSize[]){
        if(item.flag) return item.key;
    }
    return -1;
}

export function getMostCommonlyRatio(): number {
    for(const item of allRatios as TypeSize[]){
        if(item.flag) return item.key;
    }
    return -1;
}

export function getMostCommonlyDiameter(): number {
    for(const item of allDiameters as TypeSize[]){
        if(item.flag) return item.key;
    }
    return -1;
}
