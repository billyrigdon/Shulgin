import { UserDrug } from "./userDrug";

export type Story = {
  storyId: number;
  userId: number;
  title: string;
  calmness: number;
  focus: number;
  creativity: number;
  mood: number;
  irritability: number;
  wakefulness: number;
  rating: number;
  journal: string;
  date: string;
  votes: number;
};

export type StoryDrug = {
	storyId: number;
  userId: number;
  title: string;
	calmness: number;
	focus: number;
	creativity: number;
	mood: number;
	irritability: number;
	wakefulness: number;
	rating: number;
	journal: string;
  date: string;
  votes: number;
  drugs: Array<UserDrug>;
};