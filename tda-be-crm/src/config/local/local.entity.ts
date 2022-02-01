import {Column} from "typeorm";

export class local {

    @Column({nullable:true})
    en!: string;

    @Column({nullable:true})
    nl!: string;

}