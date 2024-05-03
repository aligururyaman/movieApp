import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../app/Utils/config";


export const getMoviePopular = createAsyncThunk('getMovieCountry', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.request('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
    return response.data;
  } catch (error) {
    console.error("getMoviePopuler Hatası",error);
    return rejectWithValue('Failed to fetch populer');
  }
});

export const getUpComing = createAsyncThunk('getUpComing', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.request('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);
    return response.data;
  } catch (error) {
    console.error("getUpComing Hatası",error);
    return rejectWithValue('Failed to fetch upcomign');
  }
});

export const getTopRated = createAsyncThunk('getTopRated', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.request('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    return response.data;
  } catch (error) {
    console.error("getTopRated Hatası",error);
    return rejectWithValue('Failed to fetch upcomign');
  }
});


export const getIdtoInfo = createAsyncThunk('Movie/getIdtoInfo',async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
      return response.data;
    } catch (error) {
      console.error("getIdInfo hatas",error);
      return rejectWithValue('Failed to fetch movie details');
    }
  }
);

export const getSimilarMovie = createAsyncThunk('Movie/getSimilarMovie',async (movieId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, options);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch movie details');
  }
}
);

export const getCastMovie = createAsyncThunk('Movie/getCastMovie',async (movieId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options);
    return response.data;
  } catch (error) {

    return rejectWithValue('Failed to fetch movie details');
  }
}
);

export const getPersonMovie = createAsyncThunk('Movie/getPersonMovie',async (personId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}?language=en-US`, options);
    return response.data;
  } catch (error) {
    console.error("get person Hatası",error);
    return rejectWithValue('Failed to fetch movie details');
  }
}
);

export const getPersonMovieData = createAsyncThunk('Movie/getPersonMovieData',async (personId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`, options);
    return response.data;
  } catch (error) {
    console.error("get person Hatası",error);
    return rejectWithValue('Failed to fetch movie details');
  }
}
);


const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    moviePopuler : null,
    moviePopulerLoading: false,
    moviePopularError: null,
    movieUpComing: null,
    movieUpComingLoading: false,
    movieUpComingError: null,
    movieTopRated: null,
    movieTopRatedLoading: false,
    movieTopRatedError: null,
    movieGetId: null,
    movieGetIdLoading: false,
    movieGetIdError: null,
    movieGetSimilar: null,
    movieGetSimilarLoading: false,
    movieGetSimilarError: null,
    movieGetCast: null,
    movieGetCastLoading: false,
    movieGetCastError: null,
    movieGetPerson: null,
    movieGetPersonLoading: false,
    movieGetPersonError: null,
    movieGetPersonData: null,
    movieGetPersonDataLoading: false,
    movieGetPersonDataError: null       
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviePopular.pending, (state) => {
        state.moviePopulerLoading = true;
        state.moviePopuler = null;
        state.moviePopularError = null;
      })
      .addCase(getMoviePopular.fulfilled, (state, action) => {
        state.moviePopulerLoading = false;
        state.moviePopuler = action.payload;
        state.moviePopularError = null;
      })
      .addCase(getMoviePopular.rejected, (state, action) => {
        state.moviePopulerLoading = false;
        state.moviePopuler = null;
        state.moviePopularError = action.payload;
      })
      .addCase(getUpComing.pending, (state) => {
        state.movieUpComingLoading = true;
        state.movieUpComing = null;
        state.movieUpComingError = null;
      })
      .addCase(getUpComing.fulfilled, (state, action) => {
        state.movieUpComingLoading = false;
        state.movieUpComing = action.payload;
        state.movieUpComingError = null;
      })
      .addCase(getUpComing.rejected, (state, action) => {
        state.movieUpComingLoading = false;
        state.movieUpComing = null;
        state.movieUpComingError = action.payload;
      })
      .addCase(getTopRated.pending, (state) => {
        state.movieTopRatedLoading = true;
        state.movieTopRated = null;
        state.movieTopRatedError = null;
      })
      .addCase(getTopRated.fulfilled, (state, action) => {
        state.movieTopRatedLoading = false;
        state.movieTopRated = action.payload;
        state.movieTopRatedError = null;
      })
      .addCase(getTopRated.rejected, (state, action) => {
        state.movieTopRatedLoading = false;
        state.movieTopRated = null;
        state.movieTopRatedError = action.payload;
      })
      .addCase(getIdtoInfo.pending, (state) => {
        state.movieGetIdLoading = true;
        state.movieGetId = null;
        state.movieGetIdError = null;
      })
      .addCase(getIdtoInfo.fulfilled, (state, action) => {
        state.movieGetIdLoading = false;
        state.movieGetId = action.payload;
        state.movieTopRatedError = null;
      })
      .addCase(getIdtoInfo.rejected, (state, action) => {
        state.movieGetIdLoading = false;
        state.movieGetId = null;
        state.movieGetIdError = action.payload;
      })
      .addCase(getSimilarMovie.pending, (state) => {
        state.movieGetSimilarLoading = true;
        state.movieGetSimilar = null;
        state.movieGetSimilarError = null;
      })
      .addCase(getSimilarMovie.fulfilled, (state, action) => {
        state.movieGetSimilarLoading = false;
        state.movieGetSimilar = action.payload;
        state.movieGetSimilarError = null;
      })
      .addCase(getSimilarMovie.rejected, (state, action) => {
        state.movieGetSimilarLoading = false;
        state.movieGetSimilar = null;
        state.movieGetSimilarError = action.payload;
      })
      .addCase(getCastMovie.pending, (state) => {
        state.movieGetCastLoading = true;
        state.movieGetCast = null;
        state.movieGetCastError = null;
      })
      .addCase(getCastMovie.fulfilled, (state, action) => {
        state.movieGetCastLoading = false;
        state.movieGetCast = action.payload;
        state.movieGetCastError = null;
      })
      .addCase(getCastMovie.rejected, (state, action) => {
        state.movieGetCastLoading = false;
        state.movieGetCast = null;
        state.movieGetCastError = action.payload;
      })
      .addCase(getPersonMovie.pending, (state) => {
        state.movieGetPersonLoading = true;
        state.movieGetPerson = null;
        state.movieGetPersonError = null;
      })
      .addCase(getPersonMovie.fulfilled, (state, action) => {
        state.movieGetPersonLoading = false;
        state.movieGetPerson = action.payload;
        state.movieGetPersonError = null;
      })
      .addCase(getPersonMovie.rejected, (state, action) => {
        state.movieGetPersonLoading = false;
        state.movieGetPerson = null;
        state.movieGetPersonError = action.payload;
      })
      .addCase(getPersonMovieData.pending, (state) => {
        state.movieGetPersonDataLoading = true;
        state.movieGetPersonData = null;
        state.movieGetPersonDataError = null;
      })
      .addCase(getPersonMovieData.fulfilled, (state, action) => {
        state.movieGetPersonDataLoading = false;
        state.movieGetPersonData = action.payload;
        state.movieGetPersonDataError = null;
      })
      .addCase(getPersonMovieData.rejected, (state, action) => {
        state.movieGetPersonDataLoading = false;
        state.movieGetPersonData = null;
        state.movieGetPersonDataError = action.payload;
      })
  }
})

export const movieReducer = movieSlice.reducer;
