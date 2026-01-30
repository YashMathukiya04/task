import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateStockDto {
    @IsNotEmpty()
    @IsInt()
    product_id : number;

    @IsNotEmpty()
    @IsString()
    batch_number : string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity : number;

    @IsNotEmpty()
    @IsDateString()
    expiry_date : Date;
}
