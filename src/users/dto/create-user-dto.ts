export class CreateUserDto {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly agreed: boolean;
    readonly info_source: string
}