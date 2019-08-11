import { TokenListData } from '../token-list-data/token-list-data';
import { Observable } from 'rxjs';

export interface TokenListDataService {

    data: TokenListData[];

    add(item: TokenListData);
    
    update(item: TokenListData);
    
    delete(item: TokenListData);
    
    getAll(): Observable<TokenListData[]>;
    
    getById(id: number): Observable<TokenListData>;
}
