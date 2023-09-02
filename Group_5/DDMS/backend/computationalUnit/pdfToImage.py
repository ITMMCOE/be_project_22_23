import numpy as np
import pdf2image
import cv2
import pandas as pd
from tabula import read_pdf
from pdf2image import convert_from_path
import matplotlib.pyplot as plt
import pytesseract
from concurrent.futures import ThreadPoolExecutor
import PyPDF2
import re
import sys
import json
from PIL import Image
from random import random

pdf_path = sys.argv[1]



def convert_to_image(page_number):
    pil_image = pdf2image.convert_from_path(pdf_path,dpi=300,first_page=page_number, last_page=page_number)[0]
    np_array = np.array(pil_image)
    bgr_array = cv2.cvtColor(np_array, cv2.COLOR_RGB2BGR)
    return bgr_array

im = Image.fromarray(convert_to_image(1))
width, height = im.size
im_name = f'{int(random()*10000)}.jpeg'
im.save("./public/temp/" + im_name)
print(json.dumps({"name": im_name, "width": width, "height": height}))
sys.stdout.flush()
