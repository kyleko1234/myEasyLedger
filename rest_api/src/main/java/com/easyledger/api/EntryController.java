package com.easyledger.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v0.1")
public class EntryController {
	private EntryRepository entryRepo;



	public EntryController(EntryRepository entryRepo) {
		super();
		this.entryRepo = entryRepo;
	}


	@GetMapping("/entry")
    public List<Entry> getAllEntries() {
        return entryRepo.findAll();
    }

	
    @GetMapping("/entry/{id}")
    public ResponseEntity<EntryDTO> getEntryById(@PathVariable(value = "id") Long entryId)
        throws ResourceNotFoundException {
    	Entry entry = entryRepo.findById(entryId)
    		.orElseThrow(() -> new ResourceNotFoundException("Entry not found for this id :: " + entryId)); 
    	EntryDTO entryDTO = new EntryDTO(entry);
        return ResponseEntity.ok().body(entryDTO);
    }
}

