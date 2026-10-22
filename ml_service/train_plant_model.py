# PlantVillage Dataset Training Script (TensorFlow / Keras)
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model

# 1. Dataset Directory (PlantVillage folder with 38 disease sub-folders)
train_dir = './PlantVillage/train'

# 2. Image Preprocessing & Augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split=0.2
)

train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

# 3. Transfer Learning Model Construction
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
predictions = Dense(38, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# Freeze base layers for initial training
for layer in base_model.layers:
    layer.feature = False

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# 4. Train Model
# model.fit(train_generator, epochs=10)

# 5. Save Model for FastAPI / Spring Boot Service
model.save('plant_disease_model.h5')
print("Model saved successfully as plant_disease_model.h5!")