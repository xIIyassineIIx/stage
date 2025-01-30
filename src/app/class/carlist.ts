export class Carlist {
    constructor(
        public uid:string,
        public id:number,
        public vin:string,
        public odometre:number,
        public primaryDamage:string,
        public estimated:number,
        public engineType:string,
        public transmission:string,
        public drive:string,
        public type:string,
        public bidStatus:string,
        public currentBid:string,
        public image:string[],
        public location:string,
        public date:string,
        public model:string,
        public brand:string,
        public color:string,
        public highlight:string,
        public holder:string
    ){

    }
}
