import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { WatchListEntry } from "./WatchListEntry";

@Entity()
export class WatchList {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @OneToMany(type => WatchListEntry, entry => entry.watchList)
  watchListEntries: WatchListEntry[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
}