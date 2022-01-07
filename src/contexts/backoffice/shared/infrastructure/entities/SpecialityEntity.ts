import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'cxp_speciality',
  orderBy: { id: 'DESC' },
  synchronize: true,
})
export class SpecialityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  @Index({ unique: true })
  uid: string;

  @Column()
  name: string;

  @Column()
  disabled: boolean;
}
