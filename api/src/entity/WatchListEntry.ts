import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { WatchList } from "./WatchList";

@Entity()
export class WatchListEntry {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  tmdbId: number;

  @Column('text')
  notes: string;

  @Column('integer')

  @ManyToOne(type => WatchList, watchList => watchList.watchListEntries)
  watchList: WatchList;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
}