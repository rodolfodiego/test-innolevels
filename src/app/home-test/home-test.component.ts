import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../services/main.service';

declare var jQuery: any;

@Component({
  selector: 'app-home-test',
  templateUrl: './home-test.component.html',
  styleUrls: ['./home-test.component.css']
})
export class HomeTestComponent implements OnInit {
  @ViewChild('movieModal') movieModal: ElementRef;
  @ViewChild('deleteMovieModal') deleteMovieModal: ElementRef;

  listMovies = [];
  formMovie: FormGroup;
  showSpinner = false;
  editMovie = false;
  emptyList = false;
  movieNotFound = false;
  idMomivoToEdite: any;
  movieToDelete: any;
  typePodruct = [
    'VHS',
    'DVD',
    'BLU RAY'
  ];
  typeMovie = [
    '24 HORAS'
  ];
  genreMovie = [
    'Ação',
    'Aventura',
    'Biográfico',
    'Comédia',
    'Histórico',
    'Drama',
    'Fantasia',
    'Ficção científica',
    'Musical',
    'Romance',
    'Terror'
  ];
  constructor(
    private formBuilder: FormBuilder,
    private mainservice: MainService,
  ){}

  ngOnInit(): void {
    this.getMovieList();
    this.formMovie = this.formBuilder.group({
      number: [''],
      typeProduct: ['VHS'],
      typeMovie: ['24 HORAS'],
      genre: ['Ação'],
      title: [''],
      actors: [''],
      directors: [''],
      provider: [''],
      language: [''],
      value: [''],
      dateRegister: [''],
      year: [''],
      description: [''],
      urlMoviePoster: ['']
    });
  }
  getMovieList(){
    this.showSpinner = true;
    this.mainservice.getListMovies().subscribe(res => {
      this.listMovies = res;
      this.movieNotFound = false;

      if (this.listMovies.length > 2){
        this.emptyList = true;
      }
      this.showSpinner = false;
    },
    (errorResponse: HttpErrorResponse) => {
      this.showSpinner = false;
    });
  }
  searchMovie(characters){

    this.showSpinner = true;
    const listMovies = [];
    if (characters === '' || characters === null){
      this.getMovieList();
    }else{
      for (let i = 0; i < this.listMovies.length; i++) {

        if (this.listMovies[i].title.match(characters)) {
          listMovies.push(this.listMovies[i]);
          this.movieNotFound = false;
        }else if (this.listMovies[i].year.match(characters)){
          listMovies.push(this.listMovies[i]);
          this.movieNotFound = false;
        }else if (this.listMovies[i].directors.match(characters)){
          listMovies.push(this.listMovies[i]);
          this.movieNotFound = false;
        }else if (this.listMovies[i].genre.match(characters)){
          listMovies.push(this.listMovies[i]);
          this.movieNotFound = false;
        }else if (this.listMovies[i].description.match(characters)){
          listMovies.push(this.listMovies[i]);
          this.movieNotFound = false;
        }else{
          this.emptyList = false;
          this.movieNotFound = true;
        }
      }
      this.listMovies = listMovies;
      this.showSpinner = false;
    }


  }
  registerMovie(){
    this.editMovie = false;
    this.formMovie.reset();
    jQuery(this.movieModal.nativeElement).modal('show');
  }
  sendRegisterMovie(){

    this.showSpinner = true;
    if (!this.editMovie){
      this.mainservice.registerMovie(this.formMovie.value).subscribe(res => {
        console.log(res);
        window.location.reload();
        this.showSpinner = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.showSpinner = false;
      });
    }else{
      this.mainservice.editMovie(this.formMovie.value, this.idMomivoToEdite).subscribe(res => {
        console.log(res);
        window.location.reload();
        this.showSpinner = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.showSpinner = false;
      });
    }
  }
  deleteMovie(){
    this.showSpinner = true;
    this.mainservice.deleteMovie(this.movieToDelete.id).subscribe(res => {
      console.log(res);
      window.location.reload();
      this.showSpinner = false;
    },
    (errorResponse: HttpErrorResponse) => {
      this.showSpinner = false;
    });
  }
  modalEditMovie(movie){
    this.editMovie = true;
    this.idMomivoToEdite = movie.id;
    this.formMovie.controls.number.setValue(movie.number);
    this.formMovie.controls.typeProduct.setValue(movie.typeProduct);
    this.formMovie.controls.typeMovie.setValue(movie.typeMovie);
    this.formMovie.controls.genre.setValue(movie.genre);
    this.formMovie.controls.title.setValue(movie.title);
    this.formMovie.controls.actors.setValue(movie.actors);
    this.formMovie.controls.directors.setValue(movie.directors);
    this.formMovie.controls.provider.setValue(movie.provider);
    this.formMovie.controls.language.setValue(movie.language);
    this.formMovie.controls.value.setValue(movie.value);
    this.formMovie.controls.dateRegister.setValue(movie.dateRegister);
    this.formMovie.controls.year.setValue(movie.year);
    this.formMovie.controls.description.setValue(movie.description);
    this.formMovie.controls.urlMoviePoster.setValue(movie.urlMoviePoster);
    jQuery(this.movieModal.nativeElement).modal('show');

  }
  modalDeleteMovie(movie){
    this.movieToDelete = movie;
    jQuery(this.deleteMovieModal.nativeElement).modal('show');
  }
  clearForm(){
    this.formMovie.reset();
  }

}
