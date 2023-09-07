import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bycript from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<Boolean> {
    const hash = await bycript.hash(password, this.salt);

    return hash === this.password;
  }
}
