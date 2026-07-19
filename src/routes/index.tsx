import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../../app/modules/home-page";

export const Route = createFileRoute("/")({ component: HomePage });
