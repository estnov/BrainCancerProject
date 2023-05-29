from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
from django.http import JsonResponse
from appRestaurante.Logica import modeloSNN
import pandas as pd
from PIL import Image
import numpy as np 
from IPython.display import Image

print("Librerias importadas")

class Clasificacion():
    def determinarCategoria(request):
        return render(request, "comentarioRestaurante.html")
    @api_view(['GET','POST'])
    def predecir(request):
        print('Llamada a funcion predecir por pagina html')
        try:
            print("Ingresa a predecir")
            #Formato de datos de entrada
            
            image = request.POST.get('localpath')
            print("imagen convertida y leida")
            
            #La imagen debe llegar an array 1D:
            
            string_data = image.strip('[]')
            
            
            
            elements = [int(element) for element in string_data.split(',')]
            pixel = np.array(elements)

            print(pixel.shape)
            
            df = pd.DataFrame(pixel.reshape(1, -1), columns=[f'Pixel_{i+1}' for i in range(len(pixel))])


            print(df.head())
            
            resul=modeloSNN.modeloSNN.predict(modeloSNN.modeloSNN,df)
        except:
            resul='Datos inválidos'
        return render(request, "informe.html",{"e":resul})
    @csrf_exempt
    @api_view(['GET','POST'])
    def predecirIOJson(request):
        print('***')
        print('Leyendo imagen')
        
        #Formato de datos de entrada
        #La imagen debe llegar an array 1D:

        # Reshape the pixel matrix into a 1D array
        pixel_values = request.POST.get('IMAGEN')
        
        string_data = pixel_values.strip('[]')
        elements = [int(element) for element in string_data.split(',')]
        pixel = np.array(elements)

        print(pixel.shape)
        
        df = pd.DataFrame(pixel.reshape(1, -1), columns=[f'Pixel_{i+1}' for i in range(len(pixel))])

        print('***')
        
        print(df.head())
        
        #print(comentario)   
        resul=modeloSNN.modeloSNN.predict(modeloSNN.modeloSNN,df)
        data = {'result': resul}
        resp=JsonResponse(data)
        resp['Access-Control-Allow-Origin'] = '*'
        return resp