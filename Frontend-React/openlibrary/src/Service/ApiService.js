import axios from "axios";
const URL='http://localhost:8080/library';
export default class ApiService{

    getAllBook(){
        return axios.get(URL);
    }
    createBook(book){
        return axios.post(URL,book);
    }
    getBookById(booknum){
        return axios.get(URL+'/'+booknum);
    }
    updateBook(booknum,book){
        return axios.put(URL+'/'+booknum,book);
    }
    deleteBook(booknum){
        return axios.delete(URL+'/'+booknum);
    }
    searchauthor(word){
        return axios.get(URL+'/'+word);
    }
    searchbook(word){
        return axios.get(URL+'/'+word);
    }
    sorting(feild){
        return axios.get(URL+'/'+feild);
    }
}
