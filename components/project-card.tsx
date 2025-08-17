import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg bg-[rgba(0,0,0,0.3)] border-2 border-[rgba(255,78,66,0.3)] hover:border-[rgba(255,78,66,0.6)] backdrop-blur-sm rounded-none">
        <div className="relative aspect-video overflow-hidden">
          <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105 filter brightness-110 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent" />
          <div className="absolute bottom-2 left-2 text-[#ff4e42] text-[11px] sm:text-xs font-mono tracking-wide">
            PROJECT_{project.id.toString().padStart(2,'0')}
          </div>
        </div>
        <CardContent className="flex-grow pt-5 sm:pt-6 px-4 sm:px-6">
          <h3 className="font-bold mb-2 text-[#ff4e42] uppercase font-mono leading-snug text-[clamp(1rem,2.2vw,1.15rem)]">{project.title}</h3>
          <p className="text-[#c2b8b2] mb-4 font-mono leading-relaxed text-[clamp(0.75rem,1.8vw,0.9rem)] line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
            {project.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-[10px] sm:text-xs bg-[rgba(255,78,66,0.1)] border border-[rgba(255,78,66,0.3)] text-[#ff4e42] hover:bg-[rgba(255,78,66,0.2)] font-mono tracking-wide">
                  {tag}
                </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
          <Button asChild variant="ghost" size="sm" className="uppercase font-mono min-h-[42px] w-full sm:w-auto text-[#ff4e42] hover:bg-[rgba(255,78,66,0.1)] text-[11px] sm:text-xs tracking-wide">
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> DEPLOY
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="uppercase font-mono min-h-[42px] w-full sm:w-auto text-[#ff4e42] hover:bg-[rgba(255,78,66,0.1)] text-[11px] sm:text-xs tracking-wide">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> SOURCE
            </Link>
          </Button>
        </CardFooter>
      </Card>
  )
}
