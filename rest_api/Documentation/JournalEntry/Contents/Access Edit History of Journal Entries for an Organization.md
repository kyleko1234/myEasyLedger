### Access Edit History of Journal Entries for an Organization
Endpoint: `GET /journalEntry/organization/{organizationId}/log`

Authorization: Requester must be at least an admin of the relevant organization.

Retrieves a list of journal entry creations, updates, and deletions for an organization, ordered by most recent. TODO: paginate results.

Response format can be found [[Access Edit History of a Journal Entry|here]].

