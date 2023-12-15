import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { CreateCategoryDto } from 'libs/shared/src/lib/models/create-category-dto';
import { UpdateCategoryDto } from 'libs/shared/src/lib/models/update-category-dto';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { CategoryService } from 'libs/shared/src/lib/services/category.service';

@Injectable({ providedIn: 'root' })
export class CategoryStateService {
  #query = injectQuery();
  #mutation = injectMutation();
  #client = injectQueryClient();
  #categoryService = inject(CategoryService);

  getCategories() {
    return this.#query({
      queryKey: ['categories'],
      queryFn: () => this.#categoryService.findCategories(),
    });
  }

  createCategory(body: CreateCategoryDto) {
    return this.#mutation({
      mutationFn: () => this.#categoryService.createCategory({ body }),
    });
  }

  updateCategory(id: number, body: UpdateCategoryDto) {
    return this.#mutation({
      mutationFn: () => this.#categoryService.findCategory({ id, body }),
    });
  }

  deleteCategory(id: number) {
    return this.#mutation({
      mutationFn: () => this.#categoryService.deleteCategory({ id }),
    });
  }
}
