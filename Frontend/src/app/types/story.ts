import { UserDrug } from "./userDrug";

export type Story = {
  storyId: number;
  userId: number;
  calmness: number;
  focus: number;
  creativity: number;
  mood: number;
  irritability: number;
  wakefulness: number;
  rating: number;
  journal: string;
  date: string;
};

export type StoryDrug = {
	storyId: number;
	userId: number;
	calmness: number;
	focus: number;
	creativity: number;
	mood: number;
	irritability: number;
	wakefulness: number;
	rating: number;
	journal: string;
  date: string;
  drugs: Array<UserDrug>;
};