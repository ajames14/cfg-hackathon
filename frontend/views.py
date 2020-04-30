
import os
import mimetypes
from django.views.generic import View
from django.http import HttpResponse, HttpResponseNotFound


class Home(View):

    def get(self, _request):
        with open(os.path.join(os.path.dirname(__file__), 'dist', 'index.html')) as file:
            return HttpResponse(file.read())


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'dist', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                mimetype = mimetypes.guess_type(path, strict=True)[0]
                return HttpResponse(file.read(), content_type=mimetype)
        else:
            return HttpResponseNotFound()
