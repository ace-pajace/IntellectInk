import React, { useEffect } from 'react';
// import ApiService from '../ApiService';

const HomePage: React.FC = () => {
    // const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    // const apiService = new ApiService();

    useEffect(() => {
        // const fetchPopularMovies = async () => {
        //     const movies = await apiService.getPopularMovies();
        //     setPopularMovies(movies);
        // };

        // fetchPopularMovies();
    }, []);

    return (
        <div>
        </div>
        // <Container maxWidth="xs" sx={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        //     {/* extract to components - CarouselSection */}
        //     <Typography 
        //         variant="h5" 
        //         color="initial" 
        //         mb={2}
        //         sx={{ fontWeight: 'bold', color: 'primary.light' }}
        //     >
        //         Popular Movies
        //     </Typography>
        //     <Carousel
        //         elements={popularMovies.map((movie) => (
        //             <MovieItem key={`popular-${movie._id}`} movie={movie} />
        //         ))} 
        //     />
        //     <Typography 
        //         variant="h5" 
        //         color="initial" 
        //         mt={2} 
        //         mb={2}
        //         sx={{ fontWeight: 'bold', color: 'primary.light' }}
        //     >Upcoming Movies</Typography>
        //     <Carousel
        //         elements={upcomingMovies.map((movie) => (
        //             <MovieItem key={`upcoming-${movie._id}`} movie={movie} />
        //         ))} 
        //     />
        // </Container>
    );
}

export default HomePage;
