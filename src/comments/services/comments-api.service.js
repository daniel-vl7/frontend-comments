import http from '../../shared/services/http-common';

export class CommentsApiService{
    getAll() {
        return http.get('/comments');
    }
    create(data) {
        return http.post('/comments', data);
    }
    update(id, data) {
        return http.put(`/comments/${id}`, data);
    }

    delete(id) {
        return http.delete(`/comments/${id}`);
    }
}
