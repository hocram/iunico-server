import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
//import { Transform } from 'class-transformer';

export class UserCreateDto {

    @ApiProperty()
    @AutoMap()
    @MaxLength(20)
    @IsAlphanumeric()
    @IsNotEmpty()
    @IsString({ message: 'Username is required!' })
    username: string;

    @ApiProperty({ minimum: 4, maximum: 20, description: 'At least 1 capital, 1 small, 1 special character & 1 number' })
    @AutoMap()
    @MinLength(4)
    @MaxLength(20)
    @IsString({ message: 'Password is required!' })
    @IsNotEmpty()
    /*
    @Matches(
        /((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak'}
    )
    // '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
    */
    password: string;

    @ApiProperty({ maximum: 254 })
    @AutoMap()
    @MaxLength(254)
    @IsString({ message: 'Email is required!' })
    @IsEmail({}, { message: 'Invalid Email!' })
    @IsNotEmpty()
    //@Transform((email: string) => email.toLowerCase())
    email: string;

}