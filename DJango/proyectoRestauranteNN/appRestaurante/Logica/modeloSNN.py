import pandas as pd
from sklearn.svm import SVC
import pickle
import numpy as np 
from IPython.display import Image
from PIL import Image


print("Librerias importadas")

class modeloSNN():
   
    def predict(self,df):
        
        filename = "svc.pickle"
        with open(filename, 'rb') as file:
            model = pickle.load(file)
        predictions = model.predict(df)
        
        salida = []
        for pred in predictions:
            if(pred==1):
                salida.append("Positivo a cancer cerebral")
            else:
                salida.append("El diagnostico preliminar es negativo")
        
        return salida
