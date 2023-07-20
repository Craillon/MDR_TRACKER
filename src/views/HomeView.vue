<template>
  <div class="font-bold flex justify-between px-4 py-6 w-11/12 border- mx-auto">
    <div class="inline-flex space-x-4">
      <img src="../assets/armoirie-la-republique-du-congo1.png" alt="" class="h-14">
      <div class="text-lg uppercase">
        <h1 class="text-center">M.B.C.P.P.P</h1>
        <h1 class="text-xs font-sans text-center  bg-green-600 px-4 inline-flex items-center space-x-4 text-slate-100 p-2 rounded-full">
          <!-- <img src="../assets/logo-sipae.svg" alt="" class="h-4"> -->
          <span class="">mdr Checker</span>
        </h1>
      </div>
    </div>
    <form v-show="filesItems.left.name !== '' && filesItems.right.name !== '' && isError.confirm == false">
      <button @click="compare" data-modal-target="preview" data-modal-toggle="preview" data-popover-placement="top" type="button" class="transition-all duration-150 rounded text-sm font-medium px-5 py-2.5">
        <svg  class="w-4 h-4 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
          <path stroke="currentColor" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M2 5h17m-9 8V6M2 1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
        </svg>
        <span>visualiser</span>
      </button>
      <button @click="exportFile" data-popover-target="popover-top" data-popover-placement="top" type="submit" class="transition-all duration-150 rounded text-sm font-medium px-5 py-2.5">
        <svg @click="exportFile" class="w-4 h-4 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
        </svg>
        <span>Exporter</span>
      </button>
    </form>
  </div>
  <!-- INPUTS SECTIONS  -->
  <div class="relative items-center grid grid-cols-2 gap-4 w-11/12 mx-auto px-4 mt-28 mb-10">
    <!-- LEFT DAD -->
    <div
      @drop.prevent="leftDrop"
      :class="[
        leftFileHover ? 'bg-green-500 text-white' : 'border text-slate-800',
        leftFileInputShow ? 'border-green-500 border-2 border-dotted bg-green-500 text-white' : '',
        'col-span-1 opacity-80 transition-all duration-150 p-2 rounded-md shadow-sm h-64 flex justify-center items-center'
      ]"
    >
      <div
        @dragenter.prevent="leftFileFunction"
        @dragleave.prevent="leftFileFunction"
        @drop.prevent="leftFileFunction"
        @dragover.prevent
        class="relative w-full h-full flex items-center"
      >
        <div :class="[leftFileInputShow ? 'hidden' : 'w-full']">
          <img src="https://img.icons8.com/fluency/240/microsoft-excel-2019.png" alt="excel icon" class="w-16 mx-auto my-3 p-2 h-16 rounded-full bg-white">
          <h1 class="text-sm text-center font-semibold uppercase">Exportez le MDR en
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">.xlsx</kbd>
          </h1>
        </div>
        <div :class="[leftFileInputShow ? '' : 'hidden', 'w-full h-full p-7 flex justify-center items-center']">
          <h1 class="texte-center uppercase text-sm text-white font-semibold mt-4">
            <svg class="w-14 h-14 mb-8 text-green-500 p-2 rounded-full bg-green-100 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
            <span>Fichier chargé</span>
          </h1>
        </div>
        <!-- <input id="leftFile" type="file" class="absolute hiddn top-0 left-0 right-0 h-full bg-red-400 w-full"> -->
      </div>
    </div>
    <!-- REFETCH BTN  -->
    <form class="absolute bg-white border z-40 shadow flex overflow-hidden justify-center items-center w-16 h-16 rounded-full left-0 right-0 mx-auto">
      <button type="submit" class="w-full h-full border-dotted border-2 rounded-full border-slate-600">
        <svg class="w-8 h-8 text-slate-600 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
        </svg>
      </button>
    </form>
    <!-- RIGHT DAD -->
    <div
      @drop.prevent="rightDrop"
      :class="[
        rightFileHover ? 'bg-indigo-500 text-white' : 'border text-slate-800',
        rightFileInputShow ? 'border-green-500 border-2 border-dotted bg-indigo-500 text-white' : '',
        'col-span-1 opacity-80 transition-all duration-150 p-2 rounded-md shadow-sm h-64 flex justify-center items-center'
      ]"
    >
      <div
        @dragenter.prevent="rightFileFunction"
        @dragleave.prevent="rightFileFunction"
        @drop.prevent="rightFileFunction"
        @dragover.prevent
        class="relative w-full h-full flex items-center"
      >
        <div :class="rightFileInputShow ? 'hidden' : 'w-full'">
          <img src="https://img.icons8.com/fluency/240/microsoft-excel-2019.png" alt="excel icon" class="w-16 mx-auto my-3 p-2 h-16 rounded-full bg-white">
          <h1 class="text-sm text-center font-semibold uppercase">Exportez le MDR en 
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">.xlsx</kbd>

          </h1>
        </div>
        <div :class="[rightFileInputShow ? '' : 'hidden', 'w-full h-full p-7 flex justify-center items-center']">
          <h1 class="texte-center uppercase text-sm text-white font-semibold mt-4">
            <svg class="w-14 h-14 mb-8 text-green-500 p-2 rounded-full bg-green-100 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
            <span>Fichier chargé</span>
          </h1>
        </div>
        <!-- <input id="leftFile" type="file" class="absolute hiddn top-0 left-0 right-0 h-full bg-red-400 w-full"> -->
      </div>
    </div>
  </div>

  <!-- DETAIL SECTION  -->
  <div class="grid grid-cols-2 gap-4 w-11/12 mx-auto">
    <div class="col-span-1 p-2">
      <h1 class="text-slate-800 font-semibold">Nom : <span class="font-sans">{{ filesItems.left.name }}</span></h1>
      <h1 class="text-slate-800 font-semibold">Taille : <span class="font-sans text-amber-700">{{ filesItems.left.size }} Ko</span></h1>
    </div>
    <div class="col-span-1 text-end p-2">
      <h1 class="text-slate-800 font-semibold"><span class="font-sans">{{ filesItems.right.name }}</span> : Nom</h1>
      <h1 class="text-slate-800 font-semibold"><span class="font-sans text-amber-700">{{ filesItems.right.size }} Ko</span> : Taille</h1>
    </div>
  </div>

  <!-- FOOTER SECTIONS  -->
  <div class="col-span-2 flex items-center space-x-5 justify-center p-2 absolute bottom-0 left-0 right-0 mx-auto py-5 bg-slate-600">
    <h1 class="text-slate-50 text-sm">LF DATA : <span class="font- text-xl">{{ filesItems.rowLeft }}&nbsp;</span>rows</h1>
    <h1 class="text-slate-50 text-sm">RF DATA : <span class="font- text-xl">{{ filesItems.rowRight }}&nbsp;</span>rows</h1>
    <h1 class="text-slate-50 text-sm">Ecart  : <span class="font- text-xl">{{ Math.abs(filesItems.rowLeft - filesItems.rowRight) }}</span></h1>
    <a href="https://vistin-portfolio.netlify.app/" class="absolute left-10 inline-flex items-center text-white space-x-5">
      <span>Vistin Beaugarel DIMI @Craillon {{ new Date().getFullYear() }}</span>
      <img src="../components/icons/image-1000x1000.jpg" alt="designer image" class="w-10 h-10 rounded-full">
    </a>
  </div>

  <!-- MODAL -->
  <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Toggle modal
  </button>
  <div id="defaultModal" tabindex="-1" aria-hidden="false" :class="isError.confirm ? 'flex justify-center items-center ' : 'hidden' " class="fixed top-0 left-0 right-0 z-50 bg-slate-600/60 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <form class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 :class="[ isError.color ,'uppercase text-xl font-semibold text-red-700 dark:text-white']">
                      [{{ isError.status }}]
                  </h3>
                  <button @click="closeModel" type="submit" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </form>
              <!-- Modal body -->
              <div class="p-6 space-y-6">
                  <p class="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                    {{ isError.msg }}
                  </p>
              </div>
          </div>
      </div>
  </div>

  <!-- Visualisation MODAL -->
  <div id="preview" tabindex="-1" aria-hidden="false" class="fixed hidden top-0 left-0 right-0 z-50 bg-slate-600/60 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-5xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg mx-auto shadow dark:bg-gray-700 w-10/12">
              <!-- Modal header -->
              <form class="flex w-full items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 class="uppercase text-xl font-semibold text-slate-800 dark:text-white">
                      [ MDR OVERFLOW ]
                  </h3>
                  <button @click="closeModel" type="submit" class="text-gray-600 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </form>
              <!-- Modal body -->
              <div class="p-6 space-y-6 w-full">
                  <div class="relative overflow-x-auto">
                      <table class="w-full text-sm border text-left text-gray-500 dark:text-gray-400">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                  <th v-for="item in header" :key="item" scope="col" class="px-6 py-3">
                                      {{ item }} 
                                  </th>
                                  <th scope="col" class="px-6 py-3 text-slate-900 font-semibold">
                                      FILE_NAME
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="row in dataPull" :key="row" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <td v-for="(item, index) in row.data" :key="index" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {{ item }}
                                  </td>
                                  <td class="px-6 py-4 text-slate-900 font-semibold ">
                                      {{ row.fileName }}
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>

              </div>
              <form class="py-8 px-8">
                <button @click="exportFile" data-popover-target="popover-top" data-popover-placement="top" type="submit" class="transition-all text-white bg-slate-800 inline-flex items-center space-x-4 hover:shadow-md rounded duration-150 text-sm font-medium px-5 py-2.5">
                  <svg @click="exportFile" class="w-4 h-4 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                  </svg>
                  <span>Exporter</span>
                </button>
              </form>
          </div>
      </div>
  </div>

  <!--  -->


</template>
 <script setup lang="js">
  import { ref } from "vue";
  import { v4 as uuid } from 'uuid'
  import { read, utils, writeFile } from 'xlsx';
  import { compareLR,extractData, getExtension } from '../utils/index';


  // Mouse Hover
  const leftFileHover = ref(false)
  const rightFileHover = ref(false)

  // DATA SET HEADER
  const header = ref(null)
  
  const fileExport = ref(null)

  // Error segment
  const isError = ref({
    confirm: false,
    status: "",
    msg: ``,
    color: ""
  })

  // DATA EXTRATED
  const newDataRight = ref(new Array)
  const newDataLeft = ref(new Array)

  // DATA PULL
  const dataPull = ref(new Array)
  const data_set = ref([
    {fileName: "", data: new Array},
    {fileName: "", data: new Array},
  ])

  // 
  let filesItems = ref({
    left: {
      name: '',
      type: '',
      size: 0,
    },
    right: {
      name: '',
      type: '',
      size: 0,
    },
    rowLeft: 0,
    rowRight: 0,
})

  let fileLeft = ref(new Array)
  let fileRight = ref(new Array)

  // Input Target
  const leftFileInputShow = ref(false)
  const rightFileInputShow = ref(false)

  const rightFileFunction = () => {
    rightFileHover.value = !rightFileHover.value
  }

  const leftFileFunction = () => {
    leftFileHover.value = !leftFileHover.value
  }

  let extensionL = ref(null)
  let extensionR = ref(null)

  const generateBase64String = (file) => {

      const readerUrl = new FileReader();
      readerUrl.readAsDataURL(file)
      readerUrl.onload = () => {
        const input = readerUrl.result.toString()
        const replaceValue = (input.split(',')[0])
        const base64String = input.replace(replaceValue + ".", "")
        const current_file = {
          fileName: file.name,
          url: base64String
        }
        const mdr = JSON.parse(localStorage.getItem('MDR_Commted'))
        mdr.push(current_file)
        localStorage.setItem('MDR_Commted', JSON.stringify(mdr))
      }
  }

  const leftDrop = (e) => {
    extensionL.value = getExtension(e.dataTransfer.files[0].name)
    if (extensionL.value === "xlsx") {
      filesItems.value.rowLeft = fileLeft.value.length
      const file = e.dataTransfer.files[0]
      filesItems.value.left = {
        name: e.dataTransfer.files[0].name,
        type: e.dataTransfer.files[0].type,
        size: e.dataTransfer.files[0].size,
      }
      leftFileInputShow.value = true

      const reader = new FileReader();

      generateBase64String(file)

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

        header.value = jsonData[0]
        data_set.value[0] = {
          fileName: file.name,
          data: jsonData
        }

        filesItems.value.rowLeft = jsonData.length
        newDataLeft.value = extractData(jsonData)
      };
      reader.readAsArrayBuffer(file);
      checkContraint()
    }else {
      isError.value = {
        status: "Extension ERROR",
        confirm: true,
        msg: `Rassurez-vous que le fichier passé a pour extension .xlsx`,
        color: "text-red-700"
      }
    }
  }

  const rightDrop = (e) => {
    extensionR.value = getExtension(e.dataTransfer.files[0].name)
    if (extensionR.value === "xlsx") {
      const file = e.dataTransfer.files[0]
      filesItems.value.rowRight = fileRight.value.length
      filesItems.value.right = {
        name: e.dataTransfer.files[0].name,
        type: e.dataTransfer.files[0].type,
        size: e.dataTransfer.files[0].size,
      }

      rightFileInputShow.value = true

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

        data_set.value[1] = {
          fileName: file.name,
          data: jsonData
        }

        filesItems.value.rowRight = jsonData.length
        newDataRight.value = extractData(jsonData)
      };
      reader.readAsArrayBuffer(file);
      checkContraint()
    }else {
      isError.value = {
        status: "Extension ERROR",
        confirm: true,
        msg: `Rassurez-vous que le fichier passé a pour extension .xlsx`,
        color: "text-red-700"
      }
    }

  }

  const closeModel = () => {
    isError.value.confirm = false
  }

  const checkContraint = () => {
    if(
        filesItems.value.left.name !== '' && filesItems.value.left.name == filesItems.value.right.name && filesItems.value.left.size == filesItems.value.right.size
    ){
      isError.value = {
        status: "same DATA SET",
        confirm: true,
        msg: `Il semble que vous ayez chargé le même fichier des deux côtés, veuillez à ce que vous ayez deux fichier distincts.`,
        color: "text-amber-700"
      }
    }
  }

  const compare = () => {
    const mdr_filter = compareLR(newDataLeft.value, newDataRight.value, data_set.value)
    dataPull.value = mdr_filter
  }

  const exportFile = () => {
    compare()
    const file = [
      [...header.value, "FILE_NAME"]
    ]
    dataPull.value.forEach( (row) => {
      file.push([...row.data, row.fileName])
    })
    fileExport.value = file

    const ws = utils.aoa_to_sheet(file)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, "MDR")
    writeFile(wb, `MDR_${uuid().split('-')[0]}.${new Date().toISOString().split('-').join('').split(':').join(':')}.xlsx`)
  }

 </script>