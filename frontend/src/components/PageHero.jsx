import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const PageHero = ({ title = "Page Title", subtitle = "", badge = "Welcome" }) => {
  return (
    <section className="relative w-full py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <Card className="bg-background/90 backdrop-blur-md shadow-md border-none text-center p-6 md:p-10">
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              {badge && <Badge className="text-sm">{badge}</Badge>}

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {title}
              </h1>

              {subtitle && (
                <p className="text-muted-foreground max-w-xl text-sm md:text-base">
                  {subtitle}
                </p>
              )}

              {/* Optional Button */}
              <Button variant="default" className="mt-4">
                Explore More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default PageHero
