package com.easyledger.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Category;
import com.easyledger.api.repository.AccountTypeRepository;
import com.easyledger.api.repository.CategoryRepository;

@RestController
@RequestMapping("/v0.1")
public class CategoryController {

	private CategoryRepository categoryRepo;
	private AccountTypeRepository accountTypeRepo;

    public CategoryController(CategoryRepository categoryRepo, AccountTypeRepository accountTypeRepo) {
		super();
		this.categoryRepo = categoryRepo;
		this.accountTypeRepo = accountTypeRepo;
	}

	@GetMapping("/category")
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable(value = "id") Long categoryId)
        throws ResourceNotFoundException {
        Category category = categoryRepo.findById(categoryId)
          .orElseThrow(() -> new ResourceNotFoundException("Category not found for this id :: " + categoryId));
        return ResponseEntity.ok().body(category);
    }
    
    @PostMapping("/category")
    @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@Valid @RequestBody Category category) 
    	throws ResourceNotFoundException {
    	assertExistingAccountType(category);
    	final Category updatedCategory = categoryRepo.save(category);
    	return updatedCategory;
    	}

    @PutMapping("/category/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable(value = "id") Long categoryId,
        @Valid @RequestBody Category categoryDetails) throws ResourceNotFoundException, ConflictException {
        if (!categoryId.equals(categoryDetails.getId())) {
        	throw new ConflictException("Category ID in request body does not match URI.");
        }
    	
    	categoryRepo.findById(categoryId)
        	.orElseThrow(() -> new ResourceNotFoundException("Category not found for this id :: " + categoryId));
    	assertExistingAccountType(categoryDetails);
    	final Category updatedCategory = categoryRepo.save(categoryDetails);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/category/{id}")
    public Map<String, Boolean> deleteCategory(@PathVariable(value = "id") Long categoryId)
        throws ResourceNotFoundException, ConflictException {
        Category category = categoryRepo.findById(categoryId)
        	.orElseThrow(() -> new ResourceNotFoundException("Category not found for this id :: " + categoryId));

        if (!category.getLineItems().isEmpty()) {
        	throw new ConflictException("Please remove LineItems from this category before deleting the category.");
        }
        categoryRepo.delete(category);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
    private void assertExistingAccountType (Category category) throws ResourceNotFoundException {
    	Long accountTypeId = category.getAccountType().getId();
    	accountTypeRepo.findById(accountTypeId)
    		.orElseThrow(() -> new ResourceNotFoundException("Account Type not found for this id :: " + accountTypeId));
    }
}
