package com.easyledger.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.CategoryBalanceDTO;
import com.easyledger.api.dto.CategoryDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Category;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.CategoryRepository;
import com.easyledger.api.repository.LineItemRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.service.CategoryService;

@RestController
@CrossOrigin("*")
@RequestMapping("/v0.1")
public class CategoryController {

	private CategoryRepository categoryRepo;
	private CategoryService categoryService;
	private OrganizationRepository organizationRepo;
	private LineItemRepository lineItemRepo;
	private AuthorizationService authorizationService;

    public CategoryController(CategoryRepository categoryRepo, CategoryService categoryService, 
    		OrganizationRepository organizationRepo, LineItemRepository lineItemRepo, 
    		AuthorizationService authorizationService) {
		super();
		this.categoryRepo = categoryRepo;
		this.categoryService = categoryService;
		this.organizationRepo = organizationRepo;
		this.lineItemRepo = lineItemRepo;
		this.authorizationService = authorizationService;
	}

    @Secured("ROLE_ADMIN")
	@GetMapping("/category")
    public ArrayList<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepo.findAll();
        ArrayList<CategoryDTO> categoryDtos = new ArrayList<CategoryDTO>();
        for (Category category : categories) {
        	categoryDtos.add(new CategoryDTO(category));
        }
        return categoryDtos;
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable(value = "id") Long categoryId, Authentication authentication)
        throws ResourceNotFoundException, UnauthorizedException {
        Category category = categoryRepo.findById(categoryId)
          .orElseThrow(() -> new ResourceNotFoundException("Category not found for this id :: " + categoryId));
        authorizationService.authorizeByOrganizationId(authentication, category.getAccount().getOrganization().getId());
        CategoryDTO dto = new CategoryDTO(category);
        return ResponseEntity.ok().body(dto);
    }
    
    @GetMapping("/organization/{id}/category")
    public List<CategoryDTO> getAllCategoriesForOrganization(@PathVariable(value = "id") Long organizationId, Authentication authentication) 
    	throws UnauthorizedException {
    	authorizationService.authorizeByOrganizationId(authentication, organizationId);
    	return categoryRepo.getAllCategoriesForOrganization(organizationId);
    }
    
    @GetMapping("/organization/{id}/categoryBalance")
    public List<CategoryBalanceDTO> getAllCategoryBalancesForOrganization(@PathVariable(value = "id") Long organizationId, Authentication authentication) 
    	throws UnauthorizedException {
    	authorizationService.authorizeByOrganizationId(authentication, organizationId);
    	return categoryRepo.getAllCategoryBalancesForOrganization(organizationId);
    }
    
    @GetMapping("/category/{id}/categoryBalance")
    public CategoryBalanceDTO getCategoryBalanceById(@PathVariable(value = "id") Long categoryId, Authentication authentication)
        throws ResourceNotFoundException, UnauthorizedException {
    	Category category = categoryRepo.findById(categoryId)
    	          .orElseThrow(() -> new ResourceNotFoundException("Category not found for this id :: " + categoryId));
    	authorizationService.authorizeByOrganizationId(authentication, category.getAccount().getOrganization().getId());
        CategoryBalanceDTO result = categoryRepo.getCategoryBalanceById(categoryId);
        return result;
    }
    
    @PostMapping("/category") //TODO untested for proper behavior of CategoryService!
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryDTO createCategory(@Valid @RequestBody CategoryDTO dto, Authentication authentication) 
    	throws ResourceNotFoundException, ConflictException, UnauthorizedException {
    	if (dto.getCategoryId() != null) {
    		throw new ConflictException("Please do not attempt to manually generate a categoryId.");
    	}
    	Category category = categoryService.createCategoryFromDTO(dto, authentication);
    	final Category updatedCategory = categoryRepo.save(category);
    	return new CategoryDTO(updatedCategory);
    	}

    @PutMapping("/category/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable(value = "id") Long categoryId,
        @Valid @RequestBody CategoryDTO dto, Authentication authentication) 
        		throws ResourceNotFoundException, ConflictException, UnauthorizedException {
    	Category categoryDetails = categoryService.createCategoryFromDTO(dto, authentication);
        if (!categoryId.equals(categoryDetails.getId())) {
        	throw new ConflictException("Category ID in request body does not match URI.");
        }
    	
    	categoryRepo.findById(categoryId)
        	.orElseThrow(() -> new ResourceNotFoundException("Category not found for this id :: " + categoryId));
    	final Category updatedCategory = categoryRepo.save(categoryDetails);
    	CategoryDTO newDto = new CategoryDTO(updatedCategory);
        return ResponseEntity.ok(newDto);
    }

    @DeleteMapping("/category/{id}")
    public Map<String, Boolean> deleteCategory(@PathVariable(value = "id") Long categoryId, Authentication authentication)
        throws ResourceNotFoundException, ConflictException, UnauthorizedException {
        Category category = categoryRepo.findById(categoryId)
        	.orElseThrow(() -> new ResourceNotFoundException("Category not found for this id :: " + categoryId));
        
        authorizationService.authorizeByOrganizationId(authentication, category.getAccount().getOrganization().getId());
        boolean categoryContainsLineItems = lineItemRepo.categoryContainsLineItems(categoryId);
        if (categoryContainsLineItems) {
        	throw new ConflictException("Please remove all LineItems from this category before deleting the category.");
        }
        category.setDeleted(true);
        categoryRepo.save(category);
        
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
}
