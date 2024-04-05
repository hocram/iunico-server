import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
import { AutoMap } from "@automapper/classes";

@Entity('audit_logs')
export class AuditLogsEntity { 

    // ID
    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number;

    // MESSAGE
    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    @AutoMap()
    message: string;

    // DATE CREATED AT
    @Column()
    @CreateDateColumn({
        name: 'date_created'
    })
    dateCreated: Date;
}