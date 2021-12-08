import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'AthletePhoto' })
export class AthletePhoto {
  @PrimaryGeneratedColumn()
  photo_id: number;

  @Column('blob', {
    nullable: true,
    name: 'photo',
  })
  photo: Buffer;

  @Column()
  mime_type: string;
}
