import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Permission } from "../../permissions/entities/permission.entity";
import { Activity } from "../../activities/entities/activity.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => Activity, (activities) => activities.user)
  activities: Activity[];
}
