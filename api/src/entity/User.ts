import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import bcrypt from 'bcrypt';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  encryptedPassword: string;

  @Column({ nullable: true })
  displayName: string;

  @CreateDateColumn()
  createdAt: Date;
    
  @UpdateDateColumn()
  updatedAt: Date;
}

export function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) reject(error);
      resolve(hash);
    });
  });
}

export function checkPassword(password: string, passwordHash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  })
}
