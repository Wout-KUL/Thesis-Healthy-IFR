from __future__ import print_function
from __future__ import division
from torchvision import models
import torch
from torchvision import transforms
 
def pretrained():
    dir(models)

    # alexnet = models.alexnet(pretrained=True)

    # # First, load the model
    resnet = models.resnet50(pretrained=True)
    print(resnet)

        

    from torchvision import transforms
    transform = transforms.Compose([            #[1]
    transforms.Resize(256),                    #[2]
    transforms.CenterCrop(224),                #[3]
    transforms.ToTensor(),                     #[4]
    transforms.Normalize(                      #[5]
    mean=[0.485, 0.456, 0.406],                #[6]
    std=[0.229, 0.224, 0.225]                  #[7]
    )])



    # Import Pillow
    from PIL import Image
    img = Image.open(r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\aubergine.jpg")

    img_t = transform(img)
    batch_t = torch.unsqueeze(img_t, 0)

    # Second, put the network in eval mode
    resnet.eval()
    
    # Third, carry out model inference
    out = resnet(batch_t)	
    # alexnet.eval()
    # out = alexnet(batch_t)
    print(out.shape)

    with open(r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\imagenet_classes.txt") as f:
        classes = [line.strip() for line in f.readlines()]

    # _, index = torch.max(out, 1)
    
    # percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    
    # print(classes[index[0]], percentage[index[0]].item())

    # _, indices = torch.sort(out, descending=True)
    # print([(classes[idx], percentage[idx].item()) for idx in indices[0][:5]])


    
    # Forth, print the top 5 classes predicted by the model
    _, indices = torch.sort(out, descending=True)
    percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    print([(classes[idx], percentage[idx].item()) for idx in indices[0][:5]])



import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import torchvision
from torchvision import datasets, models, transforms
import matplotlib.pyplot as plt
import time
import os
import copy
# print("PyTorch Version: ",torch.__version__)
# print("Torchvision Version: ",torchvision.__version__)



def train_model(model, dataloaders, criterion, optimizer,device,  num_epochs=25, is_inception=False):
    since = time.time()

    val_acc_history = []

    best_model_wts = copy.deepcopy(model.state_dict())
    best_acc = 0.0

    for epoch in range(num_epochs):
        print('Epoch {}/{}'.format(epoch, num_epochs - 1))
        print('-' * 10)

        # Each epoch has a training and validation phase
        for phase in ['train', 'val']:
            print(phase)
            if phase == 'train':
                model.train()  # Set model to training mode
            else:
                model.eval()   # Set model to evaluate mode

            running_loss = 0.0
            running_corrects = 0

            # Iterate over data.
            counter = 0
            for inputs, labels in dataloaders[phase]:
                if counter % 100 == 0 :
                    print(counter, len(dataloaders[phase]))
                counter +=1
                inputs = inputs.to(device)
                labels = labels.to(device)

                # zero the parameter gradients
                optimizer.zero_grad()

                # forward
                # track history if only in train
                with torch.set_grad_enabled(phase == 'train'):
                    # Get model outputs and calculate loss
                    # Special case for inception because in training it has an auxiliary output. In train
                    #   mode we calculate the loss by summing the final output and the auxiliary output
                    #   but in testing we only consider the final output.
                    if is_inception and phase == 'train':
                        # From https://discuss.pytorch.org/t/how-to-optimize-inception-model-with-auxiliary-classifiers/7958
                        outputs, aux_outputs = model(inputs)
                        loss1 = criterion(outputs, labels)
                        loss2 = criterion(aux_outputs, labels)
                        loss = loss1 + 0.4*loss2
                    else:
                        outputs = model(inputs)
                        loss = criterion(outputs, labels)

                    _, preds = torch.max(outputs, 1)

                    # backward + optimize only if in training phase
                    if phase == 'train':
                        loss.backward()
                        optimizer.step()

                # statistics
                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)

            epoch_loss = running_loss / len(dataloaders[phase].dataset)
            epoch_acc = running_corrects.double() / len(dataloaders[phase].dataset)

            print('{} Loss: {:.4f} Acc: {:.4f}'.format(phase, epoch_loss, epoch_acc))

            # deep copy the model
            if phase == 'val' and epoch_acc > best_acc:
                best_acc = epoch_acc
                best_model_wts = copy.deepcopy(model.state_dict())
            if phase == 'val':
                val_acc_history.append(epoch_acc)

        print()

    time_elapsed = time.time() - since
    print('Training complete in {:.0f}m {:.0f}s'.format(time_elapsed // 60, time_elapsed % 60))
    print('Best val Acc: {:4f}'.format(best_acc))

    # load best model weights
    model.load_state_dict(best_model_wts)
    return model, val_acc_history


def set_parameter_requires_grad(model, feature_extracting):
    if feature_extracting:
        for param in model.parameters():
            param.requires_grad = False





def initialize_model(model_name, num_classes, feature_extract, use_pretrained=True):
    # Initialize these variables which will be set in this if statement. Each of these
    #   variables is model specific.
    model_ft = None
    input_size = 0

    if model_name == "resnext":
        # model_ft = torch.hub.load('pytorch/vision:v0.10.0', 'resnext50_32x4d', pretrained=True)
        model_ft = models.resnext101_64x4d(pretrained=use_pretrained)
        set_parameter_requires_grad(model_ft, feature_extract)
        num_ftrs = model_ft.fc.in_features
        model_ft.fc = nn.Linear(num_ftrs, num_classes)
        input_size = 224

    elif model_name == "resnet":
        """ Resnet50
        """
        model_ft = models.resnet50(pretrained=use_pretrained)
        set_parameter_requires_grad(model_ft, feature_extract)
        num_ftrs = model_ft.fc.in_features
        model_ft.fc = nn.Linear(num_ftrs, num_classes)
        input_size = 224

    elif model_name == "alexnet":
        """ Alexnet
        """
        model_ft = models.alexnet(pretrained=use_pretrained)
        set_parameter_requires_grad(model_ft, feature_extract)
        num_ftrs = model_ft.classifier[6].in_features
        model_ft.classifier[6] = nn.Linear(num_ftrs,num_classes)
        input_size = 224

    elif model_name == "vgg":
        """ VGG11_bn
        """
        model_ft = models.vgg11_bn(pretrained=use_pretrained)
        set_parameter_requires_grad(model_ft, feature_extract)
        num_ftrs = model_ft.classifier[6].in_features
        model_ft.classifier[6] = nn.Linear(num_ftrs,num_classes)
        input_size = 224

    elif model_name == "squeezenet":
        """ Squeezenet
        """
        model_ft = models.squeezenet1_0(pretrained=use_pretrained)
        set_parameter_requires_grad(model_ft, feature_extract)
        model_ft.classifier[1] = nn.Conv2d(512, num_classes, kernel_size=(1,1), stride=(1,1))
        model_ft.num_classes = num_classes
        input_size = 224

    elif model_name == "densenet":
        """ Densenet
        """
        model_ft = models.densenet121(pretrained=use_pretrained)
        set_parameter_requires_grad(model_ft, feature_extract)
        num_ftrs = model_ft.classifier.in_features
        model_ft.classifier = nn.Linear(num_ftrs, num_classes)
        input_size = 224

    elif model_name == "inception":
        """ Inception v3
        Be careful, expects (299,299) sized images and has auxiliary output
        """
        model_ft = models.inception_v3(pretrained=use_pretrained)
        set_parameter_requires_grad(model_ft, feature_extract)
        # Handle the auxilary net
        num_ftrs = model_ft.AuxLogits.fc.in_features
        model_ft.AuxLogits.fc = nn.Linear(num_ftrs, num_classes)
        # Handle the primary net
        num_ftrs = model_ft.fc.in_features
        model_ft.fc = nn.Linear(num_ftrs,num_classes)
        input_size = 299

    else:
        print("Invalid model name, exiting...")
        exit()

    return model_ft, input_size

def train(nmb_classes, nmb_examples, data_dir, num_epochs = 10):

    # Top level data directory. Here we assume the format of the directory conforms
    #   to the ImageFolder structure



    # Models to choose from [resnet, alexnet, vgg, squeezenet, densenet, inception]
    # model_name = "resnet"
    model_name = "resnext"




    # Batch size for training (change depending on how much memory you have)
    batch_size = 2
    batch_size = 10


    # Number of epochs to train for
    # num_epochs = 15


    # Flag for feature extracting. When False, we finetune the whole model,
    #   when True we only update the reshaped layer params
    feature_extract = True

    # Initialize the model for this run
    model_ft, input_size = initialize_model(model_name, nmb_classes, feature_extract, use_pretrained=True)

    # Print the model we just instantiated
    # print(model_ft)

    # Data augmentation and normalization for training
    # Just normalization for validation

    data_transforms = {
        'train': transforms.Compose([
            transforms.RandomResizedCrop(input_size),
            transforms.RandomHorizontalFlip(),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
        'val': transforms.Compose([
            transforms.Resize(input_size),
            transforms.CenterCrop(input_size),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    print("Initializing Datasets and Dataloaders...")

    # Create training and validation datasets
    # image_datasets = {x: datasets.ImageFolder(os.path.join(data_dir, y), data_transforms[x]) for [x, y] in [["train", 'train' + str(nmb_examples)], ['val', 'val']]}
    # # Create training and validation dataloaders
    # dataloaders_dict = {x: torch.utils.data.DataLoader(image_datasets[x], batch_size=batch_size, shuffle=True, num_workers=2) for x in ["train", 'val']}
    image_datasets = {x: datasets.ImageFolder(os.path.join(data_dir, x), data_transforms[x]) for x in ["train", 'val']}
    print("image_datasets is " ,  image_datasets, "\t")
    # Create training and validation dataloaders
    dataloaders_dict = {x: torch.utils.data.DataLoader(image_datasets[x], batch_size=batch_size, shuffle=True, num_workers=2) for x in ["train", 'val']}


    # Detect if we have a GPU available
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

    # Send the model to GPU
    model_ft = model_ft.to(device)

    # Gather the parameters to be optimized/updated in this run. If we are
    #  finetuning we will be updating all parameters. However, if we are
    #  doing feature extract method, we will only update the parameters
    #  that we have just initialized, i.e. the parameters with requires_grad
    #  is True.
    params_to_update = model_ft.parameters()
    print("Params to learn:")
    if feature_extract:
        params_to_update = []
        for name,param in model_ft.named_parameters():
            if param.requires_grad == True:
                params_to_update.append(param)
                print("\t",name)
    else:
        for name,param in model_ft.named_parameters():
            if param.requires_grad == True:
                print("\t",name)

    # Observe that all parameters are being optimized
    optimizer_ft = optim.SGD(params_to_update, lr=0.001, momentum=0.9)

    # Setup the loss fxn
    criterion = nn.CrossEntropyLoss()
    print("image_datasets is " ,  image_datasets, "\t")

    # Train and evaluate
    model_ft, hist = train_model(model_ft, dataloaders_dict, criterion, optimizer_ft, device, num_epochs=num_epochs, is_inception=(model_name=="inception"))
    return model_ft, hist

def inferrence(model, imagePath):
    from PIL import Image
    transform = transforms.Compose([            #[1]
    transforms.Resize(256),                    #[2]
    transforms.CenterCrop(224),                #[3]
    transforms.ToTensor(),                     #[4]
    transforms.Normalize(                      #[5]
    mean=[0.485, 0.456, 0.406],                #[6]
    std=[0.229, 0.224, 0.225]                  #[7]
    )])

    img = Image.open(imagePath)

    img_t = transform(img)
    batch_t = torch.unsqueeze(img_t, 0)

    # Second, put the network in eval mode
    model.eval()
    
    # Third, carry out model inference
    out = model(batch_t)	
    # alexnet.eval()
    # out = alexnet(batch_t)
    print(out.shape)

    # with open(r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\imagenet_classes.txt") as f:
    #     classes = [line.strip() for line in f.readlines()]
    # classes = ["appel", "banaan", "wortel", "komkommer"]
    classes = []

    for i in range(0, 76):
        classes.append(str(i))

    # _, index = torch.max(out, 1)
    
    # percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    
    # print(classes[index[0]], percentage[index[0]].item())

    # _, indices = torch.sort(out, descending=True)
    # print([(classes[idx], percentage[idx].item()) for idx in indices[0][:5]])


    
    # Forth, print the top 5 classes predicted by the model
    _, indices = torch.sort(out, descending=True)
    percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    print([(classes[idx], percentage[idx].item()) for idx in indices[0][:3]])

if __name__ == '__main__':
    # data_dir = r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\data\ingredients" #"./data/hymenoptera_data"

    # # Models to choose from [resnet, alexnet, vgg, squeezenet, densenet, inception]
    # model_name = "resnet"



    # # Batch size for training (change depending on how much memory you have)
    # batch_size = 8

    # # Number of epochs to train for
    # # num_epochs = 15
    # num_epochs = 1

    # # Flag for feature extracting. When False, we finetune the whole model,
    # #   when True we only update the reshaped layer params
    # feature_extract = True

    # # Initialize the model for this run
    # model_ft, input_size = initialize_model(model_name, 4, feature_extract, use_pretrained=True)

    # # Print the model we just instantiated
    # print(model_ft)

    # # Data augmentation and normalization for training
    # # Just normalization for validation

    # data_transforms = {
    #     'train': transforms.Compose([
    #         transforms.RandomResizedCrop(input_size),
    #         transforms.RandomHorizontalFlip(),
    #         transforms.ToTensor(),
    #         transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    #     ]),
    #     'val': transforms.Compose([
    #         transforms.Resize(input_size),
    #         transforms.CenterCrop(input_size),
    #         transforms.ToTensor(),
    #         transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    #     ]),
    # }

    # print("Initializing Datasets and Dataloaders...")

    # # Create training and validation datasets
    # image_datasets = {x: datasets.ImageFolder(os.path.join(data_dir, x), data_transforms[x]) for x in ['train', 'val']}
    # # Create training and validation dataloaders
    # dataloaders_dict = {x: torch.utils.data.DataLoader(image_datasets[x], batch_size=batch_size, shuffle=True, num_workers=2) for x in ['train', 'val']}
    # print(dataloaders_dict)
    # # Display image and label.
    # train_features, train_labels = next(iter(dataloaders_dict["train"]))
    # print(f"Feature batch shape: {train_features.size()}")
    # print(f"Labels batch shape: {train_labels.size()}")
    # imgs = train_features[0].squeeze()
    # print(imgs)
    # label = train_labels[0]
    # for img in imgs:
    #     plt.imshow(img, cmap="gray")
    #     plt.show()
    #     print(f"Label: {label}")



    # nmbs = [10, 20, 30]
    # for nmb in nmbs:
    #     nmb_classes = 4
    #     model, hist = train(nmb_classes, nmb)
    #     print(str(nmb) + " ", hist)
    # torch.save(model.state_dict(), r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\model.pth")

    # data_dir = r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\data\hymenoptera_data" #"./data/hymenoptera_data"
    # data_dir = r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\data\ingredients" #"./data/hymenoptera_data"


    # print(dir(models))
    # print(models)
    # pretrained()

    data_dir = r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\data\Final_data" #"./data/hymenoptera_data"
    nmb= 0
    nmb_classes = 76
    num_epochs = 40
    model, hist = train(nmb_classes, nmb, data_dir, num_epochs) 
    torch.save(model.state_dict(), r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\model.pth")
    # model = models.resnet50()
    model_ft = models.resnext101_64x4d()

    set_parameter_requires_grad(model, True)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, nmb_classes)

    model.load_state_dict(torch.load(r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\model.pth"))
    model.eval()
    imagePath = r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\groeneOlijf.jpg"
    inferrence(model, imagePath)