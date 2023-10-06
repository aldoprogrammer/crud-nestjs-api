/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryDto {
    @Field()
    readonly _id: string;

    @Field()
    readonly name: string;

    @Field()
    createdAt: Date;

    @Field({nullable: true})
    updateAt: Date;
}

