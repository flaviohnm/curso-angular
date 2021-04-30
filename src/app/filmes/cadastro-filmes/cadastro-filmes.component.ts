import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Alerta } from './../../shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';
import { AlertaComponent } from './../../shared/components/alerta/alerta.components';
import { FilmesService } from './../../core/filmes.service';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  generos: Array<string>;

  constructor(public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmesService: FilmesService) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });
    this.generos = [
                    'Ação',
                    'Romance',
                    'Aventura',
                    'Terror',
                    'Ficção Científica',
                    'Comédia',
                    'Drama',
                    'Seriado'
                  ];
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a Listagem',
          btnCancelar: 'Cadastrar novo Filme',
          corBtnCancelar: 'primrary',
          possuirBtnFechar: true
        } as Alerta
      };
      const DialogRef = this.dialog.open(AlertaComponent, config);
    },
      () => {
        alert('ERRO AO SALVAR');
      });
  }

}
