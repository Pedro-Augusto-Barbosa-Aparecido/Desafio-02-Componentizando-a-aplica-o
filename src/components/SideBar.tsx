import { useState, useEffect } from "react"
import { api } from "../services/api";
import { Button } from "./Button";

interface Genres {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  onSelectGenre: (genreId: number) => void
  setSelectedGenre: (genre: Genres) => void
}

export function SideBar({ onSelectGenre, selectedGenreId,setSelectedGenre }: SideBarProps) {
  const [genres, setGenres] = useState<Genres[]>([])

  useEffect(() => {
    api.get<Genres[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Genres>(`genres/${selectedGenreId}`).then(response => {
      onSelectGenre(response.data.id)
      setSelectedGenre(response.data)
    })
  }, [selectedGenreId])

  console.log(genres)

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres?.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onSelectGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}