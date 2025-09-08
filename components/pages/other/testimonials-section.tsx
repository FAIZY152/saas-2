import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "YouTube Creator",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The thumbnail generator has increased my click-through rates by 300%. It's like having a professional designer on my team!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Marketing Agency Owner",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The AI video ads tool has revolutionized our client campaigns. We're creating high-quality ads in minutes, not hours.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Content Strategist",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The trending keywords feature keeps me ahead of the curve. My content consistently ranks higher now.",
      rating: 5,
    },
    {
      name: "David Park",
      role: "E-commerce Brand",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The AI avatars look so realistic! Our video ads have never performed better. ROI increased by 250%.",
      rating: 5,
    },
    {
      name: "Lisa Thompson",
      role: "Social Media Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I love how I can select only the tools I need. No more paying for features I don't use. Perfect pricing model!",
      rating: 5,
    },
    {
      name: "Alex Kumar",
      role: "Digital Marketer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The analytics insights are incredible. I finally understand what makes content go viral. Game-changer!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Loved by Creators Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of content creators who are already transforming
            their workflow with our AI tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
