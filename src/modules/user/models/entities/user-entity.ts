import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    //BaseEntity,
    //OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    //OneToOne,
    //BeforeInsert,
    //ManyToOne, 
    //CreateDateColumn,
    //UpdateDateColumn,
    //JoinColumn,
    //BeforeInsert,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { AutoMap } from "@automapper/classes";
import * as bcrypt from 'bcrypt';
import { RoleEntity } from './role-entity';

@Entity('users')
export class UserEntity { //extends BaseEntity {

    // status : export enum StatusEnum { Active = 'ACTIVE', InActive = 'INACTIVE', }
    // phone_number
    // verify_phone
    // verify_email
    // reset_password
    // user_type
    // pin
    // business_id
    // google_id
    // facebook_id
    // apple_id
    // date_deleted

    // ID
    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number;

    // USERNAME
    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true
    })
    @AutoMap()
    username: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    avatar: string;

    // FIRSTNAME
    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
        unique: false
    })
    firstName?: string;

    // LASTNAME
    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
        unique: false
    })
    lastName?: string;

    // PASSWORD
    //@Exclude()
    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    @AutoMap()
    password: string;

    // EMAIL
    @Column({
        type: 'varchar',
        length: 254,
        //unique: true,
        nullable: false,
    })
    @AutoMap()
    email: string;

    // TOKEN
    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    token: string;

    // LAST IP
    @Column({
        name: 'last_ip',
        type: 'varchar',
        length: 15,
        nullable: true
    })
    lastIpLogin: string;

    // DATE CREATED AT
    @Column()
    @CreateDateColumn({
        name: 'date_created'
    })
    dateCreated: Date;

    // DATE UPDATED AT
    @Column()
    @UpdateDateColumn({
        name: 'date_updated'
    })
    lastDateUpdated: Date;

    // DATE LAST LOGIN
    @Column({
        name: 'date_login',
        //type: 'datetime',
        nullable: true
    })
    lastDateLogin: Date;

    // ROLES
    @ManyToMany(
        () => RoleEntity,
        role => role.users,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
    )
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    public roles?: RoleEntity[];

    ////// METHOD /////

    /*
    //@BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    */

    async validatePassword(password: string): Promise<boolean> {
        //const hash = await bcrypt.hash(password, 10);
        //return hash === this.password
        //
        //return await bcrypt.compare(password, this.password);
        //
        return password == this.password;
    }

    /*
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
    */

}