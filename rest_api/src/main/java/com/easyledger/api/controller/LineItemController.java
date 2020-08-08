package com.easyledger.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.repository.LineItemRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/v0.1")
public class LineItemController {
	private LineItemRepository lineItemRepo;



	public LineItemController(LineItemRepository lineItemRepo) {
		super();
		this.lineItemRepo = lineItemRepo;
	}


	@GetMapping("/lineItem")
    public ArrayList<LineItemDTO> getAllLineItems() {
		List<LineItem> lineItems = lineItemRepo.findAll();
		ArrayList<LineItemDTO> lineItemDtos = new ArrayList<LineItemDTO>();
		for (LineItem lineItem : lineItems) {
			lineItemDtos.add(new LineItemDTO(lineItem));
		}
        return lineItemDtos;
    }

	
    @GetMapping("/lineItem/{id}")
    public ResponseEntity<LineItemDTO> getLineItemById(@PathVariable(value = "id") Long lineItemId)
        throws ResourceNotFoundException {
    	LineItem lineItem = lineItemRepo.findById(lineItemId)
    		.orElseThrow(() -> new ResourceNotFoundException("Line-item not found for this id :: " + lineItemId)); 
    	LineItemDTO lineItemDTO = new LineItemDTO(lineItem);
        return ResponseEntity.ok().body(lineItemDTO);
    }
}

