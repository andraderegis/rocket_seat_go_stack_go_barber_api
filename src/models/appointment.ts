import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity('appointments')
class Appointement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointement;
