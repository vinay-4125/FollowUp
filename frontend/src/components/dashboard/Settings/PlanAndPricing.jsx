import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const checkPoints = [
  "Unlimited Posts",
  "Unlimited Users",
  "Custom domain",
  // "Dashboard Analytics",
  // "Access to Discord",
  // "Premium Support",
];

const PlanAndPricing = () => {
  return (
    <div>
      <section className="flex flex-col gap-6 py-8 sm:max-w-full xl:w-5/6  mx-auto md:py-5 lg:py-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Pricing Plans</h1>
          <p className="text-xl pt-1">
            Choose the plan that&apos;s right for you
          </p>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              What&apos;s included in the PRO plan
            </h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Unlimited Posts
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Unlimited Users
              </li>

              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Custom domain
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Dashboard Analytics
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Access to Discord
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Premium Support
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$19</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Billed Monthly
              </p>
            </div>
            <Button>Get Started</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanAndPricing;
