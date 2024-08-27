export class Player {
  id: number;
  name: string;
  team: string;
  titles: number;
  retired: boolean;

  constructor(
    id: number, 
    name: string, 
    team: string,
    titles: number,
    retired: boolean
  ) {
    this.id = id;
    this.name = name;
    this.team = team;
    this.titles = titles;
    this.retired = retired;
  }
}
