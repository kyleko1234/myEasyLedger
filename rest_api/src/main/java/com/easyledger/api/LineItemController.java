package com.easyledger.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v0.1")
public class LineItemController {
	private LineItemRepository lineItemRepo;



	public LineItemController(LineItemRepository lineItemRepo) {
		super();
		this.lineItemRepo = lineItemRepo;
	}


	@GetMapping("/line_item")
    public List<LineItem> getAllLineItems() {
        return lineItemRepo.findAll();
    }

	
    @GetMapping("/line_item/{id}")
    public ResponseEntity<LineItemDTO> getLineItemById(@PathVariable(value = "id") Long lineItemId)
        throws ResourceNotFoundException {
    	LineItem lineItem = lineItemRepo.findById(lineItemId)
    		.orElseThrow(() -> new ResourceNotFoundException("Line-item not found for this id :: " + lineItemId)); 
    	LineItemDTO lineItemDTO = new LineItemDTO(lineItem);
        return ResponseEntity.ok().body(lineItemDTO);
    }
}

