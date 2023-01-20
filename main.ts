#!/usr/bin/env node
import colors from "colors";
import { createInterface } from "readline";
import figlet from "figlet";
import gradient from "gradient-string";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function sleep(duration: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, duration);
  });
}

async function main(): Promise<void> {
  figlet(
    `Are you ready\nfor some work ?`,
    (err: Error | null, data: string | undefined) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(gradient.pastel.multiline(data));
    }
  );

  // sleep till the above function finish
  await sleep(2000);

  let work_duration_answer: string = await ask(
    colors.green("Work duration ? (default=30) ")
  );
  let rest_duration_answer: string = await ask(
    colors.green("Rest duration ? (default=5) ")
  );

  if (!work_duration_answer) {
    work_duration_answer = "30";
  }

  if (!rest_duration_answer) {
    rest_duration_answer = "5";
  }

  console.log(
    `${work_duration_answer} min work and ${rest_duration_answer} min break.\nMay Allah help you <3`
  );

  while (true) {
    await sleep(Number(work_duration_answer) * 60000);
    console.log(
      `Great job on completing your ${work_duration_answer}-minute pomodoro! Keep up the good work! Take a ${rest_duration_answer}min break`
    );
    await sleep(Number(rest_duration_answer) * 60000);
    console.log("Time to get back to work, let's crush the next task!");
  }
}

main();
