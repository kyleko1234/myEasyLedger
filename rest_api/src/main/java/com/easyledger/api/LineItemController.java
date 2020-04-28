package com.easyledger.api;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class LineItemController {
	private LineItemRepository lineItemRepo;

	public LineItemController(LineItemRepository lineItemRepo) {
		this.lineItemRepo = lineItemRepo;
	}
	
	@GetMapping("/line_item")
    public List<LineItem> getAllLineItems() {
        return lineItemRepo.findAll();
    }

	
	@GetMapping("/line_item/{id}")
	public LineItem lineItemById(@PathVariable("id") Long id) {
	Optional<LineItem> optLineItem = lineItemRepo.findById(id);
	if (optLineItem.isPresent()) {
	return optLineItem.get(); }
	return null;
		}
}

