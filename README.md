# client-service-core

Base para cliente API micro-servicios

---

index.ts
```typescript
import { Service } from "@bahoque/client-service-axios";

interface user {
	name: string;
	email: string;
}

const userService = new Service<user>("https://jsonplaceholder.typicode.com", "users", 3000);

userService.get(1, { /* query */ }).subscribe(res => {
	// Tu código
});

userService.find({ /* query */ }).subscribe(res => {
	// Tu código
});

userService.create({name: 'test', email: 'test@test.com'}, { /* query */ }).subscribe(res => {
	// Tu código
});

userService.patch(1, {name: 'test', email: 'test@test.com'}, { /* query */ }).subscribe(res => {
	// Tu código
});

userService.remove(1, { /* query */ }).subscribe(res => {
	// Tu código
});
```
