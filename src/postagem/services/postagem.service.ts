import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }

  async findById(id: number): Promise<Postagem> {
    let postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
    });

    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return this.postagemRepository.find({
      // SELECT * FROM tb_postagens.
      where: {
        titulo: ILike(`%${titulo}%`), // O % deve estar dentro da string.
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);

    // UPDATE tb_postagens SET TITULO = postagem.titulo,
    // texto = postagem.texto, data = current_timestamp() WHERE id = postagem.id
    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    // DELETE FROM tb_postagens WHERE id = id
    return await this.postagemRepository.delete({ id });
  }
}

