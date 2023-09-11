import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bycript from 'bcrypt';
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { Book } from 'src/books/entity/books.entity';

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

  @OneToMany(() => RefreshToken, (refresToken) => refresToken.user, {
    eager: true,
  })
  refreshToken: RefreshToken[];

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  async validatePassword(password: string): Promise<Boolean> {
    const hash = await bycript.hash(password, this.salt);

    return hash === this.password;
  }
}
